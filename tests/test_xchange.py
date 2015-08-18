from unittest import TestCase
import xchange


class TestXchange(TestCase):
    def test_get_pairs_unknown(self):
        self.assertRaises(ValueError, xchange.get_ratios, "DS")

    def test_get_pairs_USD(self):
        pairs = ["'USDEUR'", "'USDGPY'", "'USDKZT'", "'USDRUB'", "'USDUAH'", "'USDUSD'"]
        result = xchange.currency_pairs("USD")

        self.assertEqual(pairs, result)

    def test_build_query(self):
        self.fail()

    def test_get_ratio_unknown(self):
        self.assertRaises(ValueError, xchange.get_ratios, "DS")
