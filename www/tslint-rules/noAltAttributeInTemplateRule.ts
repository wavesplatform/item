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
    ruleName: 'no-alt-attribute-in-template',
    type: 'maintainability',
    description: `Do use alt="..." inside img tag.`,
    options: null,
    optionsDescription: 'Not configurable',
    typescriptOnly: true,
  };

  public static FAILURE_STRING =
    'Not found alt="..." attribute inside img tag.';

  public apply(sourceFile: SourceFile): RuleFailure[] {
    return this.applyWithWalker(
      new NgWalker(sourceFile, this.getOptions(), {
        templateVisitorCtrl: NoAltAttributeInTemplateVisitor,
      }),
    );
  }
}

class NoAltAttributeInTemplateVisitor extends BasicTemplateAstVisitor {
  visitElement(ast: ElementAst, context: BasicTemplateAstVisitor): any {
    this.validateElement(ast, context);
    super.visitElement(ast, context);
  }

  private validateElement(
    ast: ElementAst,
    contest: BasicTemplateAstVisitor,
  ): any {
    if (
      ast.name === 'img' &&
      !(this.hasAltAttr(ast) || this.hasAltInput(ast))
    ) {
      this.addSourceValidationError(ast);
    }
  }

  private hasAltAttr(ast: ElementAst): boolean {
    // console.log('attrs', ast.attrs);
    return (
      !!ast.attrs.length &&
      !!ast.attrs.filter((attr: AttrAst) => attr.name === 'alt').length
    );
  }

  private hasAltInput(ast: ElementAst): boolean {
    // console.log('inputs', ast.inputs);
    return (
      !!ast.inputs.length &&
      !!ast.inputs.filter(
        (input: BoundElementPropertyAst) => input.name === 'alt',
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
