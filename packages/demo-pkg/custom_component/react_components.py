from htmltools import Tag

from shiny.module import resolve_id

from .custom_component import custom_component_deps


def react_input(id: str):
    """
    A react output.
    """
    return Tag(
        "div",
        {"class": "custom-react-input"},
        custom_component_deps,
        # Use resolve_id so that our component will work in a module
        id=resolve_id(id),
    )


def react_output(id: str):
    """
    A shiny input to demo makeReactOutput().
    """
    return Tag(
        "div",
        {"class": "custom-react-output"},
        custom_component_deps,
        # Use resolve_id so that our component will work in a module
        id=resolve_id(id),
    )
