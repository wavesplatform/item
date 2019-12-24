import { IRuleMetadata, RuleFailure, Rules } from 'tslint/lib';
import { SourceFile } from 'typescript/lib/typescript';
import { NgWalker } from 'codelyzer/angular/ngWalker';
import { BasicTemplateAstVisitor } from 'codelyzer';
import {
  AttrAst,
  BoundElementPropertyAst,
  ElementAst,
} from '@angular/compiler';

export class Rule extends Rules.AbstractRule {
  static readonly metadata: IRuleMetadata = {
    ruleName: 'no-target-blank-in-template',
    type: 'maintainability',
    description: `Do not use target="_blank" inside templates. Use ExternalLinksModule instead.`,
    options: null,
    optionsDescription: 'Not configurable',
    rationale: `ExternalLinksModule provides directive, that automatically adds target="_blank"
      as well as rel="noopener" which is security issue.`,
    typescriptOnly: true,
  };

  public static FAILURE_STRING =
    'Usage target="_blank" is not allowed. Use ExternalLinksModules instead';

  public apply(sourceFile: SourceFile): RuleFailure[] {
    return this.applyWithWalker(
      new NgWalker(sourceFile, this.getOptions(), {
        templateVisitorCtrl: NoTargetBlankTemplateVisitor,
      }),
    );
  }
}

class NoTargetBlankTemplateVisitor extends BasicTemplateAstVisitor {
  visitElement(ast: ElementAst, context: BasicTemplateAstVisitor): any {
    this.validateElement(ast, context);
    super.visitElement(ast, context);
  }

  private validateElement(
    ast: ElementAst,
    contest: BasicTemplateAstVisitor,
  ): any {
    if (
      ast.name === 'a' &&
      (this.hasTargetBlankAttr(ast) || this.hasTargetBlankInput(ast))
    ) {
      this.addSourceValidationError(ast);
    }
  }

  private hasTargetBlankAttr(ast: ElementAst): boolean {
    return (
      !!ast.attrs.length &&
      !!ast.attrs.filter(
        (attr: AttrAst) => attr.name === 'target' && attr.value === '_blank',
      ).length
    );
  }

  private hasTargetBlankInput(ast: ElementAst): boolean {
    return (
      !!ast.inputs.length &&
      !!ast.inputs.filter(
        (input: BoundElementPropertyAst) =>
          input.name === 'target' && input.value.toString() === '_blank',
      ).length
    );
  }

  private addSourceValidationError(ast: ElementAst): void {
    const {
      sourceSpan: {
        end: { offset: endOffset },
        start: { offset: startOffset },
      },
    } = ast;
    this.addFailureFromStartToEnd(startOffset, endOffset, Rule.FAILURE_STRING);
  }
}
