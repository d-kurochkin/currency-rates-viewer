class Cached(object):
    def __init__(self, lifetime=60):
        self.lifetime = lifetime
        self.cache_data = {}

    @staticmethod
    def _convert_arguments_to_hash(args, kwargs):
        return hash(str(args) + str(kwargs))
