from custom_component import (
    plain_output,
    webcomponent_input,
    webcomponent_output,
    render_custom_output,
    plain_input,
    react_output,
    react_input,
)

from shiny import App, Inputs, ui

app_ui = ui.page_fluid(
    ui.card(
        ui.card_header("Plain"),
        plain_input("plainInput"),
        plain_output("plainOutput"),
    ),
    ui.card(
        ui.card_header("React"),
        react_input("reactInput"),
        react_output("reactOutput"),
    ),
    ui.card(
        ui.card_header("Webcomponents"),
        webcomponent_input("webcomponentInput"),
        webcomponent_output("webcomponentOutput"),
    ),
)


def server(input: Inputs):
    @render_custom_output
    def plainOutput():
        return input.plainInput()

    @render_custom_output
    def reactOutput():
        return input.reactInput()

    @render_custom_output
    def webcomponentOutput():
        return input.webcomponentInput()


app = App(app_ui, server)
