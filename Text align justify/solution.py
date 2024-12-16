def justify(text, width):
    tokens = text.split()
    current_token_index = 0
    output_lines = []
    output_line_tokens = []
    current_line_width = 0
    while current_token_index < len(tokens):

        # length needed is next token + 1 for a space between existing token and new
        token_length = len(tokens[current_token_index]) + (1 if current_line_width > 0 else 0)
        if (current_line_width + token_length) <= width:
            output_line_tokens.append(tokens[current_token_index])
            current_token_index += 1
            current_line_width += token_length

        # next token won't fit so justify current tokens
        else:

            # determine how many whitespace blocks do we need. This should
            # be the number of words in the line - 1
            space_blocks_to_add = len(output_line_tokens) - 1
            if space_blocks_to_add > 0:

                # determine how many spaces add to the line. This should be (desired width
                # - width of chars in tokens) / number of blocks to add
                spaces_per_token = (width - sum([len(token) for token in output_line_tokens])) // space_blocks_to_add
                extra_spaces = (width - sum([len(token) for token in output_line_tokens])) % space_blocks_to_add
                output_line = ""
                for (token_index, output_token) in enumerate(output_line_tokens):
                    if token_index > 0:
                        spaces_to_add = " " * spaces_per_token
                        if extra_spaces > 0:
                            spaces_to_add += " "
                            extra_spaces -= 1
                        output_line += spaces_to_add
                    output_line += output_token
            else:
                output_line = output_line_tokens[0]
            output_lines.append(output_line)
            output_line_tokens = []
            current_line_width = 0

    # Deal with partially filled last line
    if len(output_line_tokens) > 0:
        output_line = ""
        for (token_index, output_token) in enumerate(output_line_tokens):
            if token_index > 0:
                output_line += " "
            output_line += output_token
        output_lines.append(output_line)

    return "\n".join(output_lines)


if __name__ == "__main__":
    # result = justify("123 45 6", 7)
    # if result == "123  45\n6":
    #     print("Winner!")
    # else:
    #     print("Loser")

    text = """\
Lorem  ipsum  dolor  sit amet,
consectetur  adipiscing  elit.
Vestibulum    sagittis   dolor
mauris,  at  elementum  ligula
tempor  eget.  In quis rhoncus
nunc,  at  aliquet orci. Fusce
at   dolor   sit   amet  felis
suscipit   tristique.   Nam  a
imperdiet   tellus.  Nulla  eu
vestibulum    urna.    Vivamus
tincidunt  suscipit  enim, nec
ultrices   nisi  volutpat  ac.
Maecenas   sit   amet  lacinia
arcu,  non dictum justo. Donec
sed  quam  vel  risus faucibus
euismod.  Suspendisse  rhoncus
rhoncus  felis  at  fermentum.
Donec lorem magna, ultricies a
nunc    sit    amet,   blandit
fringilla  nunc. In vestibulum
velit    ac    felis   rhoncus
pellentesque. Mauris at tellus
enim.  Aliquam eleifend tempus
dapibus. Pellentesque commodo,
nisi    sit   amet   hendrerit
fringilla,   ante  odio  porta
lacus,   ut   elementum  justo
nulla et dolor."""
    result = justify(" ".join(text.split()), 13)
    if result == text:
        print("Winner!")
    else:
        print("Loser")
    # result = justify("", 10)
    # if result == "":
    #     print("Winner!")
    # else:
    #     print("Loser")
