class Cached(object):
    def __init__(self, lifetime=60):
        self.lifetime = lifetime
        self.cache_data = {}

    def __call__(self, fn, *args, **kwargs):
        def cached_func(*args, **kwargs):
            cache_key = self._convert_arguments_to_hash(args, kwargs)

            if cache_key not in self.cache_data.keys():
                pass

            # return self.cache_data[cache_key]
            return fn(*args, **kwargs)

        return cached_func

    def _update_cache(self, key, value):
        self.cache_data[key] = value

    @staticmethod
    def _convert_arguments_to_hash(args, kwargs):
        return hash(str(args) + str(kwargs))
