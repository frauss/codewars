def build_frequency_hash(text):
    frequency_hash = {}
    for char in text:
        if char.islower():
            if char in frequency_hash:
                frequency_hash[char] += 1
            else:
                frequency_hash[char] = 1
    sorted_tuples = sorted(frequency_hash.items(), key=lambda item: item[1])
    return {k: v for k, v in sorted_tuples}


def mix(s1, s2):
    letter_frequencies = []
    letter_frequencies[0] = build_frequency_hash(s1)
    letter_frequencies[1] = build_frequency_hash(s2)