from random import random
from time import sleep
from unittest import TestCase
from cache import Cached


class TestCache(TestCase):
    def test_convert_arguments_to_hash(self):
        def test_fn(*args, **kwargs):
            return Cached._convert_arguments_to_hash(args, kwargs)

        args_hash = hash("(1, 'foo'){'name': 'name'}")
        result = test_fn(1, 'foo', name='name')

        self.assertEqual(args_hash, result)

    def test_cache_creation(self):
        @Cached()
        def test_fn():
            return 3

        self.assertEqual(3, test_fn())

    def test_cache_value_storing(self):
        @Cached()
        def test_fn():
            return random()

        result = test_fn()
        self.assertEqual(result, test_fn())

    def test_cache_lifetime(self):
        @Cached(lifetime=1)
        def test_fn():
            return random()

        res_1 = test_fn()
        sleep(2)
        res_2 = test_fn()

        self.assertNotEqual(res_1, res_2, msg='Cache was not updated')
