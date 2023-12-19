from htmltools import Tag

from shiny.module import resolve_id
from shiny.render.transformer import (
    TransformerMetadata,
    ValueFn,
    output_transformer,
    resolve_value_fn,
)

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


@output_transformer()
async def render_react_output(
    _meta: TransformerMetadata,
    _fn: ValueFn[str | None],
):
    res = await resolve_value_fn(_fn)
    if res is None:
        return None

    if not isinstance(res, str):
        # Throw an error if the value is not a string
        raise TypeError(f"Expected a string, got {type(res)}. ")

    # Send the results to the client. Make sure that this is a serializable
    # object and matches what is expected in the javascript code.
    return {"value": res}


def custom_react_output(id: str):
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
