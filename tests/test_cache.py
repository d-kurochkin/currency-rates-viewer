from unittest import TestCase
from cache import Cached


class TestCache(TestCase):
    def test_convert_arguments_to_hash(self):
        def test_fn(*args, **kwargs):
            return Cached._convert_arguments_to_hash(args, kwargs)

        args_hash = hash("(1, 'foo'){'name': 'name'}")
        result = test_fn(1, 'foo', name='name')

        self.assertEqual(args_hash, result)
