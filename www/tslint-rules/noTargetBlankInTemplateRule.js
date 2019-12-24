'use strict';
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
exports.__esModule = true;
var lib_1 = require('tslint/lib');
var ngWalker_1 = require('codelyzer/angular/ngWalker');
var codelyzer_1 = require('codelyzer');
var Rule = /** @class */ (function(_super) {
  __extends(Rule, _super);
  function Rule() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Rule.prototype.apply = function(sourceFile) {
    return this.applyWithWalker(
      new ngWalker_1.NgWalker(sourceFile, this.getOptions(), {
        templateVisitorCtrl: NoTargetBlankTemplateVisitor,
      }),
    );
  };
  Rule.metadata = {
    ruleName: 'no-target-blank-in-template',
    type: 'maintainability',
    description:
      'Do not use target="_blank" inside templates. Use ExternalLinksModule instead.',
    options: null,
    optionsDescription: 'Not configurable',
    rationale:
      'ExternalLinksModule provides directive, that automatically adds target="_blank"\n      as well as rel="noopener" which is security issue.',
    typescriptOnly: true,
  };
  Rule.FAILURE_STRING =
    'Usage target="_blank" is not allowed. Use ExternalLinksModules instead';
  return Rule;
})(lib_1.Rules.AbstractRule);
exports.Rule = Rule;
var NoTargetBlankTemplateVisitor = /** @class */ (function(_super) {
  __extends(NoTargetBlankTemplateVisitor, _super);
  function NoTargetBlankTemplateVisitor() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  NoTargetBlankTemplateVisitor.prototype.visitElement = function(ast, context) {
    this.validateElement(ast, context);
    _super.prototype.visitElement.call(this, ast, context);
  };
  NoTargetBlankTemplateVisitor.prototype.validateElement = function(
    ast,
    contest,
  ) {
    if (
      ast.name === 'a' &&
      (this.hasTargetBlankAttr(ast) || this.hasTargetBlankInput(ast))
    ) {
      this.addSourceValidationError(ast);
    }
  };
  NoTargetBlankTemplateVisitor.prototype.hasTargetBlankAttr = function(ast) {
    return (
      !!ast.attrs.length &&
      !!ast.attrs.filter(function(attr) {
        return attr.name === 'target' && attr.value === '_blank';
      }).length
    );
  };
  NoTargetBlankTemplateVisitor.prototype.hasTargetBlankInput = function(ast) {
    return (
      !!ast.inputs.length &&
      !!ast.inputs.filter(function(input) {
        return input.name === 'target' && input.value.toString() === '_blank';
      }).length
    );
  };
  NoTargetBlankTemplateVisitor.prototype.addSourceValidationError = function(
    ast,
  ) {
    var _a = ast.sourceSpan,
      endOffset = _a.end.offset,
      startOffset = _a.start.offset;
    this.addFailureFromStartToEnd(startOffset, endOffset, Rule.FAILURE_STRING);
  };
  return NoTargetBlankTemplateVisitor;
})(codelyzer_1.BasicTemplateAstVisitor);
