from shiny.module import resolve_id
from .custom_component import custom_component_deps
from htmltools import Tag


def webcomponent_input(id: str):
    """
    A shiny input.
    """
    return Tag(
        "webcomponent-input",
        custom_component_deps,
        # Use resolve_id so that our component will work in a module
        id=resolve_id(id),
    )


def webcomponent_output(id: str):
    """
    A shiny output.
    """
    return Tag(
        "webcomponent-output",
        custom_component_deps,
        # Use resolve_id so that our component will work in a module
        id=resolve_id(id),
    )
