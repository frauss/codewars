# Simple implementation of this:
# https://en.wikipedia.org/wiki/Shunting_yard_algorithm

operators = {
    '^': {
        "precedence": 4,
        "associativity": "R"
    },
    '*': {
        "precedence": 3,
        "associativity": "L"
    },
    '/': {
        "precedence": 3,
        "associativity": "L"
    },
    '+': {
        "precedence": 2,
        "associativity": "L"
    },
    '-': {
        "precedence": 2,
        "associativity": "L"
    }
}


def to_postfix(infix):
    tokens = list(infix)
    operator_stack = []
    postfix_tokens = []
    for token in tokens:
        if token in '0123456789':
            postfix_tokens.append(token)
        elif token == "(":
            operator_stack.append(token)
        elif token == ")":
            while operator_stack[-1] != "(":
                postfix_tokens.append(operator_stack.pop())
            operator_stack.pop()
        elif token in "^*/+-":
            token_properties = operators[token]
            while (len(operator_stack) > 0 and
                   operator_stack[-1] != '(' and
                   (operators[operator_stack[-1]]["precedence"] > token_properties["precedence"] or
                   (operators[operator_stack[-1]]["precedence"] == token_properties["precedence"] and
                    token_properties["associativity"] == "L"))):
                postfix_tokens.append(operator_stack.pop())
            operator_stack.append(token)
    if operator_stack:
        while operator_stack:
            postfix_tokens.append(operator_stack.pop())
    return "".join(postfix_tokens)
