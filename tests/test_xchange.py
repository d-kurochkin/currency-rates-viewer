from unittest import TestCase
import xchange


class TestXchange(TestCase):
    def test_get_ratio_unknown(self):
        self.assertRaises(ValueError, xchange.get_ratios, "DS")

