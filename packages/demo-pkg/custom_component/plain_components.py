from shiny.module import resolve_id
from .custom_component import custom_component_deps
from htmltools import Tag


def plain_output(id: str):
    """
    A shiny output. To be paired with
    `render_custom_component` decorator.
    """
    return Tag(
        "div",
        {"class": "custom-component-simple"},
        custom_component_deps,
        # Use resolve_id so that our component will work in a module
        id=resolve_id(id),
    )


def plain_input(id: str):
    """
    A shiny input to demo nameInputBinding().
    """
    return Tag(
        "div",
        {"class": "custom-component-input"},
        custom_component_deps,
        # Use resolve_id so that our component will work in a module
        id=resolve_id(id),
    )
