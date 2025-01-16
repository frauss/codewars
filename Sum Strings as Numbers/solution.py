def sum_strings(a, b):
    """
    This function adds two numbers represented as strings.
    """

    if not a:
        a = '0'
    if not b:
        b = '0'

    max_len = max(len(a), len(b))
    a = a.zfill(max_len)
    b = b.zfill(max_len)

    carry = 0
    result = []

    for i in range(max_len - 1, -1, -1):
        digit_sum = int(a[i]) + int(b[i]) + carry
        carry = digit_sum // 10
        result.append(str(digit_sum % 10))

    if carry:
        result.append(str(carry))

    return ''.join(reversed(result)).lstrip('0') or '0'
