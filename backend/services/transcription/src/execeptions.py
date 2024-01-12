class PodcastNotFoundException(Exception):
    def __init__(self, id: int):
        super().__init__(f"No podcast found with id={id}")


class NoUrlFoundException(Exception):
    pass
