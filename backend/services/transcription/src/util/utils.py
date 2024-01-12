import re


def sanitize_title(title: str):
    return replace_non_alphanumeric(title).lower()


def replace_non_alphanumeric(input_string) -> str:
    """
    Replace non-alphanumeric characters with an underscore.
    """
    # Use regular expression to replace consecutive non-alphanumeric characters with a single _
    output_string = re.sub(r'[^a-zA-Z0-9]+', '_', input_string)

    return output_string
