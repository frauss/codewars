import re

# Token types
TOKEN_NUMBER = "NUMBER"
TOKEN_IDENTIFIER = "IDENTIFIER"
TOKEN_OPERATOR = "OPERATOR"
TOKEN_ASSIGNMENT = "ASSIGNMENT"
TOKEN_LPAREN = "LPAREN"
TOKEN_RPAREN = "RPAREN"
TOKEN_EOF = "EOF"


class Token:
    def __init__(self, type_, value):
        self.type = type_
        self.value = value

    def __repr__(self):
        return f"Token({self.type}, {repr(self.value)})"

# Lexer


class Lexer:
    def __init__(self, text):
        self.text = text
        self.pos = 0

    def advance(self):
        self.pos += 1

    def peek(self):
        return self.text[self.pos] if self.pos < len(self.text) else None

    def tokenize(self):
        tokens = []
        while self.pos < len(self.text):
            char = self.peek()

            if char.isspace():
                self.advance()
            elif char.isdigit() or (char == '.' and self.pos + 1 < len(self.text) and self.text[self.pos + 1].isdigit()):
                tokens.append(self._number())
            elif char.isalpha() or char == '_':
                tokens.append(self._identifier())
            elif char in '+-*/%':
                tokens.append(Token(TOKEN_OPERATOR, char))
                self.advance()
            elif char == '=':
                tokens.append(Token(TOKEN_ASSIGNMENT, char))
                self.advance()
            elif char == '(':
                tokens.append(Token(TOKEN_LPAREN, char))
                self.advance()
            elif char == ')':
                tokens.append(Token(TOKEN_RPAREN, char))
                self.advance()
            else:
                raise ValueError(f"Unexpected character: {char}")
        tokens.append(Token(TOKEN_EOF, None))
        return tokens

    def _number(self):
        num = ''
        while self.peek() and (self.peek().isdigit() or self.peek() == '.'):
            num += self.peek()
            self.advance()
        return Token(TOKEN_NUMBER, float(num) if '.' in num else int(num))

    def _identifier(self):
        identifier = ''
        while self.peek() and (self.peek().isalnum() or self.peek() == '_'):
            identifier += self.peek()
            self.advance()
        return Token(TOKEN_IDENTIFIER, identifier)

# AST nodes


class AST:
    pass


class BinaryOperation(AST):
    def __init__(self, left, operator, right):
        self.left = left
        self.operator = operator
        self.right = right


class Number(AST):
    def __init__(self, value):
        self.value = value


class Identifier(AST):
    def __init__(self, name):
        self.name = name


class Assignment(AST):
    def __init__(self, identifier, value):
        self.identifier = identifier
        self.value = value

# Parser


class Parser:
    PRECEDENCE = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2,
        "%": 2,
    }

    def __init__(self, tokens):
        self.tokens = tokens
        self.pos = 0

    def current_token(self):
        return self.tokens[self.pos]

    def eat(self, token_type):
        if self.current_token().type == token_type:
            self.pos += 1
        else:
            raise ValueError(f"Expected {token_type}, got {self.current_token().type}")

    def parse(self):
        return_tree = self.expression()
        if self.current_token().type != TOKEN_EOF:
            raise ValueError(f"Unexpected token remaining: {self.current_token()}")
        return return_tree

    def expression(self, min_precedence=0):
        node = self.factor()
        while self.current_token() and self.current_token().type == TOKEN_OPERATOR:
            op = self.current_token()
            if self.PRECEDENCE[op.value] < min_precedence:
                break
            self.eat(TOKEN_OPERATOR)
            right = self.expression(self.PRECEDENCE[op.value] + 1)
            # node = BinaryOperation(node, op.value, self.factor())
            node = BinaryOperation(node, op.value, right)
        return node

    def factor(self):
        token = self.current_token()
        if token.type == TOKEN_NUMBER:
            self.eat(TOKEN_NUMBER)
            return Number(token.value)
        elif token.type == TOKEN_IDENTIFIER:
            identifier = self.identifier()
            if self.current_token().type == TOKEN_ASSIGNMENT:
                self.eat(TOKEN_ASSIGNMENT)
                value = self.expression()
                return Assignment(identifier, value)
            return identifier
        elif token.type == TOKEN_LPAREN:
            self.eat(TOKEN_LPAREN)
            node = self.expression()
            self.eat(TOKEN_RPAREN)
            return node
        else:
            raise ValueError(f"Unexpected token: {token}")

    def identifier(self):
        token = self.current_token()
        self.eat(TOKEN_IDENTIFIER)
        return Identifier(token.value)

# Evaluator


class Interpreter:
    def __init__(self):
        self.variables = {}

    def evaluate(self, node: AST) -> float:
        if isinstance(node, Number):
            return node.value
        elif isinstance(node, Identifier):
            if node.name not in self.variables:
                raise ValueError(f"Undefined variable: {node.name}")
            return self.variables[node.name]
        elif isinstance(node, Assignment):
            value = self.evaluate(node.value)
            self.variables[node.identifier.name] = value
            return value
        elif isinstance(node, BinaryOperation):
            left = self.evaluate(node.left)
            right = self.evaluate(node.right)
            if node.operator == "+":
                return left + right
            elif node.operator == "-":
                return left - right
            elif node.operator == "*":
                return left * right
            elif node.operator == "/":
                return left / right
            elif node.operator == "%":
                return left % right
            else:
                raise ValueError(f"ERROR: Invalid identifier. No variable with name {node.operator} was found.")
        else:
            raise ValueError(f"Unknown node: {node}")

    def input(self, expression):
        if len(expression.strip()) == 0:
            return ""
        lexer = Lexer(expression)
        tokens = lexer.tokenize()

        parser = Parser(tokens)
        ast = parser.parse()

        result = self.evaluate(ast)
        return result
