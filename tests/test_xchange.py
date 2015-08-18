from unittest import TestCase
import xchange


class TestXchange(TestCase):
    def test_get_pairs_unknown(self):
        self.assertRaises(ValueError, xchange.get_ratios, "DS")

    def test_get_pairs_USD(self):
        pairs = ["'USDAUD'", "'USDCAD'", "'USDCHF'", "'USDCNY'", "'USDEUR'",
                 'USDGBP', "'USDGPY'", "'USDKZT'", "'USDRUB'", "'USDUAH'"]
        result = xchange.get_pairs("USD")

        self.assertEqual(pairs, result)

    def test_get_ratio_unknown(self):
        self.assertRaises(ValueError, xchange.get_ratios, "DS")
