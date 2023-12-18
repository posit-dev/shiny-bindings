from custom_component import (
    custom_component_simple,
    render_custom_component,
    custom_component_input,
)

from shiny import App, ui

app_ui = ui.page_fluid(
    ui.input_slider("n", "Choose a value", 1, 20, 5),
    ui.input_slider("n2", "Choose a value", 1, 20, 5),
    custom_component_input("myButtonCount"),
    custom_component_simple("myOutput"),
    custom_component_simple("myOutput2"),
)


def server(input, output, session):
    @render_custom_component
    def myOutput():
        return input.n()

    @render_custom_component
    def myOutput2():
        return 2 * input.myButtonCount()


app = App(app_ui, server)
