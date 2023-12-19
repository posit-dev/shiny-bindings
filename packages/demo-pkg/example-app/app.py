from custom_component import (
    custom_component_simple,
    render_custom_component,
    custom_component_input,
    custom_react_output,
    render_react_output,
    react_input,
)

from shiny import App, ui

app_ui = ui.page_fluid(
    ui.card(
        ui.card_header("Plain"),
        custom_component_input("plainInput"),
        custom_component_simple("plainOutput"),
    ),
    ui.card(
        ui.card_header("With React"),
        react_input("reactInput"),
        custom_react_output("reactOutput"),
    ),
    ui.card(
        ui.input_slider("n2", "Choose a value", 1, 20, 5),
        custom_component_simple("myOutput2"),
    ),
)


def server(input, output, session):
    @render_custom_component
    def plainOutput():
        return input.plainInput()

    @render_custom_component
    def myOutput2():
        return 2 * input.myButtonCount()

    @render_react_output
    def reactOutput():
        return f"React output: {input.reactInput()}"


app = App(app_ui, server)
