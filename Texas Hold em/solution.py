from itertools import combinations

card_values = {
    "A": {
        "rank": 13,
        "value": 11
    },
    "K": {
        "rank": 12,
        "value": 10
    },
    "Q": {
        "rank": 11,
        "value": 10
    },
    "J": {
        "rank": 10,
        "value": 10
    },
    "10": {
        "rank": 9,
        "value": 10
    },
    "9": {
        "rank": 8,
        "value": 9
    },
    "8": {
        "rank": 7,
        "value": 8
    },
    "7": {
        "rank": 6,
        "value": 7
    },
    "6": {
        "rank": 5,
        "value": 6
    },
    "5": {
        "rank": 4,
        "value": 5
    },
    "4": {
        "rank": 3,
        "value": 4
    },
    "3": {
        "rank": 2,
        "value": 3
    },
    "2": {
        "rank": 1,
        "value": 2
    }
}


def hand(player_cards, community_cards):
    """
    Analyzes a Texas Hold'em poker hand and returns the best hand.

    Args:
        player_cards (list): A list of two strings representing the player's hand cards.
        community_cards (list): A list of up to five strings representing the community cards.

    Returns:
        str: The best hand that can be made.
    """
    # Helper functions for poker hand ranking
    # values = "23456789TJQKA"
# def parse_cards(cards):
#     hand = [{
#             "card": card,
#             "value": card_values[card[0:len(card) - 1]],
#             "suit": card[len(card) - 1]
#             } for card in cards]
#     return sorted(hand, key=lambda card: card["value"]["rank"])

    def card_value(card):
        # return values.index(card[0])
        return card_values[card[0:len(card) - 1]]["rank"]

    def card_name(card_value):
        return next((key for key, obj in card_values.items() if obj["rank"] == card_value), None)

    def is_flush(cards):
        suits = [card[-1] for card in cards]
        return len(set(suits)) == 1

    def is_straight(values):
        sorted_values = sorted(set(values))
        # Check for standard straight
        if len(sorted_values) == 5 and sorted_values[-1] - sorted_values[0] == 4:
            return True
        # Check for Ace-low straight (5-4-3-2-A)
        return sorted_values == [0, 1, 2, 3, 12]

    def hand_rank(cards):
        values = [card_value(card) for card in cards]
        values.sort(reverse=True)
        counts = {value: values.count(value) for value in values}
        counts = sorted(counts.items(), key=lambda x: (-x[1], -x[0]))
        ordered_values = [value for value, count in counts]

        flush = is_flush(cards)
        straight = is_straight(values)

        if flush and straight:
            return (8, ordered_values)  # Straight flush
        elif counts[0][1] == 4:
            return (7, ordered_values)  # Four of a kind
        elif counts[0][1] == 3 and counts[1][1] == 2:
            return (6, ordered_values)  # Full house
        elif flush:
            return (5, ordered_values)  # Flush
        elif straight:
            return (4, ordered_values)  # Straight
        elif counts[0][1] == 3:
            return (3, ordered_values)  # Three of a kind
        elif counts[0][1] == 2 and counts[1][1] == 2:
            return (2, ordered_values)  # Two pair
        elif counts[0][1] == 2:
            return (1, ordered_values)  # One pair
        else:
            return (0, ordered_values)  # High card

    # Combine player cards and community cards
    all_cards = player_cards + community_cards
    best_hand = None
    best_rank = (-1, [])

    # Evaluate all combinations of 5 cards
    for combo in combinations(all_cards, 5):
        rank = hand_rank(combo)
        if rank > best_rank:
            best_rank = rank
            best_hand = combo

    # Translate best hand to readable format
    rank_names = [
        "nothing",
        "pair",
        "two pair",
        "three-of-a-kind",
        "straight",
        "flush",
        "full house",
        "four-of-a-kind",
        "straight-flush"
    ]
    return (rank_names[best_rank[0]],
            [card_name(value) for value in best_rank[1]])
