from typing import Dict, Type

from util.custom_parser.parser import Parser, ModernDataStackParser

PARSER_MAPPING: Dict[str, Type[Parser]]= {
    "the_modern_data_show": ModernDataStackParser
}
