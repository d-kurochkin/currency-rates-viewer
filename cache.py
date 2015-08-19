import time


class Cached(object):
    def __init__(self, lifetime=60):
        self.lifetime = lifetime
        self.cache_data = {}

    def __call__(self, fn):
        def cached_func(*args, **kwargs):
            key = self._convert_arguments_to_hash(args, kwargs)
            access_time = time.time()

            if not self._key_exist(key) or self._value_outdated(key, access_time):
                result = fn(*args, **kwargs)
                self._update_cache(key, result, access_time)

            return self.cache_data[key]['value']

        return cached_func

    def _key_exist(self, key):
        return key in self.cache_data

    def _value_outdated(self, key, access_time):
        last_access_time = self.cache_data[key]['last_access']

        return last_access_time < access_time - self.lifetime

    def _update_cache(self, key, value, access_time):
        self.cache_data[key] = {
            'value': value,
            'last_access': access_time
        }

    @staticmethod
    def _convert_arguments_to_hash(args, kwargs):
        return hash(str(args) + str(kwargs))
