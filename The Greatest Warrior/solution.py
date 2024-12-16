import json

ranks = [
    {
        "name": "Pushover",
        "range": [1, 9]
    },
    {
        "name": "Novice",
        "range": [10, 19]
    },
    {
        "name": "Fighter",
        "range": [20, 29]
    },
    {
        "name": "Warrior",
        "range": [30, 39]
    },
    {
        "name": "Veteran",
        "range": [40, 49]
    },
    {
        "name": "Sage",
        "range": [50, 59]
    },
    {
        "name": "Elite",
        "range": [60, 69]
    },
    {
        "name": "Conqueror",
        "range": [70, 79]
    },
    {
        "name": "Champion",
        "range": [80, 89]
    },
    {
        "name": "Master",
        "range": [90, 99]
    },
    {
        "name": "Greatest",
        "range": [100, 100]
    }
]


class Warrior:
    def __init__(self, initial_experience=100):
        self.experience = initial_experience
        self.achievements = []

    @staticmethod
    def get_level(experience):
        return (experience // 100)

    @staticmethod
    def get_rank(level):
        # return next(rank_data["name"] for rank_data in ranks
        #             if rank_data["range"][0] >= level and level <= rank_data["range"][1])
        for rank_data in ranks:
            if level >= rank_data["range"][0] and level <= rank_data["range"][1]:
                return rank_data["name"]
        return None

    @staticmethod
    def get_rank_index(level):
        return next(rank_index for (rank_index, rank_data) in enumerate(ranks)
                    if level >= rank_data["range"][0] and level <= rank_data["range"][1])

    @property
    def experience(self):
        return self._experience

    @experience.setter
    def experience(self, new_experience):
        if new_experience >= 100 and new_experience <= 10000:
            self._experience = new_experience
        elif new_experience < 100:
            self._experience = 100
        else:
            self._experience = 10000

    @property
    def level(self):
        return Warrior.get_level(self.experience)

    @property
    def rank(self):
        return Warrior.get_rank(self.level)

    @property
    def rank_index(self):
        return Warrior.get_rank_index(self.level)

    def battle(self, opponent_level):
        if opponent_level < 1 or opponent_level > 100:
            return "Invalid level"
        level_delta = opponent_level - self.level
        rank_delta = Warrior.get_rank_index(opponent_level) - self.rank_index

        # same level opponent
        if level_delta == 0:
            self.experience += 10
            return "A good fight"

        # we have a higher level than opponent, 5 exoerience if we're 1 level
        # higher, no experience for more than 2 levels higher
        elif level_delta < 0:
            if level_delta == -1:
                self.experience += 5
                return "A good fight"
            else:
                return "Easy fight"

        # opponent has a higher level than we do.
        else:
            if rank_delta >= 1 and level_delta >= 5:
                return "You've been defeated"
            else:
                self.experience += 20 * level_delta * level_delta
                return "An intense fight"

    def training(self, arguments):
        description, experience_earned, minimum_level = arguments
        if self.level < minimum_level:
            return "Not strong enough"
        else:
            self.experience += experience_earned
            self.achievements.append(description)
            return description
        pass
