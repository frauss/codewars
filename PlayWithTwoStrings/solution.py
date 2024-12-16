def find_occurrences(s, ch):
    return [i for i, letter in enumerate(s) if letter == ch]

def perform_swaps(a, b):
    result = b
    letters_processed = set()
    for letter in a:
        if letter not in letters_processed:
            letter_count = a.count(letter)
            letter_indices = find_occurrences(result, letter)
            for count_index in range(letter_count):
                for index in letter_indices:
                    result = result[:index] + result[index:index + 1].swapcase() + result[index + 1:]
            letters_processed.add(letter)
    return result

def work_on_strings(a, b):
    resultant_b = perform_swaps(a, b)
    resultant_a = perform_swaps(b, a)
    return resultant_a + resultant_b
