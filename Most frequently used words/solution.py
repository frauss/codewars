import re


def top_3_words(text):
    pattern = r"[A-Za-z']+"
    words = [true_word for true_word in
             [word.lower() for word in re.findall(pattern, text)]
             if any(char.isalpha() for char in true_word)]
    word_counts = {}
    for word in words:
        if word in word_counts:
            word_counts[word] += 1
        else:
            word_counts[word] = 1
    sorted_words = sorted(word_counts.keys(),
                          key=lambda k: word_counts[k],
                          reverse=True)
    return sorted_words if len(sorted_words) <= 3 else sorted_words[0:3]
