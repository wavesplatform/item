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
        templateVisitorCtrl: NoAltAttributeInTemplateVisitor,
      }),
    );
  };
  Rule.metadata = {
    ruleName: 'no-alt-attribute-in-template',
    type: 'maintainability',
    description: 'Do use alt="..." inside img tag.',
    options: null,
    optionsDescription: 'Not configurable',
    typescriptOnly: true,
  };
  Rule.FAILURE_STRING = 'Not found alt="..." attribute inside img tag.';
  return Rule;
})(lib_1.Rules.AbstractRule);
exports.Rule = Rule;
var NoAltAttributeInTemplateVisitor = /** @class */ (function(_super) {
  __extends(NoAltAttributeInTemplateVisitor, _super);
  function NoAltAttributeInTemplateVisitor() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  NoAltAttributeInTemplateVisitor.prototype.visitElement = function(
    ast,
    context,
  ) {
    this.validateElement(ast, context);
    _super.prototype.visitElement.call(this, ast, context);
  };
  NoAltAttributeInTemplateVisitor.prototype.validateElement = function(
    ast,
    contest,
  ) {
    if (
      ast.name === 'img' &&
      !(this.hasAltAttr(ast) || this.hasAltInput(ast))
    ) {
      this.addSourceValidationError(ast);
    }
  };
  NoAltAttributeInTemplateVisitor.prototype.hasAltAttr = function(ast) {
    // console.log('attrs', ast.attrs);
    return (
      !!ast.attrs.length &&
      !!ast.attrs.filter(function(attr) {
        return attr.name === 'alt';
      }).length
    );
  };
  NoAltAttributeInTemplateVisitor.prototype.hasAltInput = function(ast) {
    // console.log('inputs', ast.inputs);
    return (
      !!ast.inputs.length &&
      !!ast.inputs.filter(function(input) {
        return input.name === 'alt';
      }).length
    );
  };
  NoAltAttributeInTemplateVisitor.prototype.addSourceValidationError = function(
    ast,
  ) {
    var _a = ast.sourceSpan,
      endOffset = _a.end.offset,
      startOffset = _a.start.offset;
    this.addFailureFromStartToEnd(startOffset, endOffset, Rule.FAILURE_STRING);
  };
  return NoAltAttributeInTemplateVisitor;
})(codelyzer_1.BasicTemplateAstVisitor);
