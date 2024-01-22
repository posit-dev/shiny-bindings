from __future__ import annotations
from htmltools import Tag

from shiny.render.renderer import Renderer, Jsonifiable

from .plain_components import plain_output


class render_custom_output(Renderer[int]):
    """
    Render the custom component output
    """

    def auto_output_ui(self) -> Tag:
        """
        UI for the renderer in Express mode
        """
        return plain_output(self.output_id)

    async def transform(self, value: int) -> Jsonifiable:
        """
        Transform the value to a serializable object
        """
        if not isinstance(value, int):
            # Throw an error if the value is not an integer.
            raise TypeError(f"Expected a integer, got {type(value)}. ")

        # Send the results to the client. Make sure that this is a serializable
        # object and matches what is expected in the javascript code.
        return {"value": int(value)}
