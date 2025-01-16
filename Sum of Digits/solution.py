def digital_root(n):
    while (n // 10) > 0:
        n = sum([int(char) for char in list(str(n))])
    return n
