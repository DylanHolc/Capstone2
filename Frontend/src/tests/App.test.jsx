import React from "react";
import App from "../App";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../users/Login";
import Register from "../users/Register";
import Cart from "../users/Cart";
import Profile from "../users/Profile";

describe("App renders with all components intact", () => {
    it("renders App component without crashing", () => {
        render(<MemoryRouter><App /></MemoryRouter>);
    });

    it("has mutliple pokemon references", () => {
        render(<MemoryRouter><App /></MemoryRouter>);
        const pokemon = screen.getAllByText("Pokemon");
        expect(pokemon).toHaveLength(3);
    });

    it("has multiple yugioh references", () => {
        render(<MemoryRouter><App /></MemoryRouter>);
        const yugioh = screen.getAllByText("Yu-Gi-Oh");
        expect(yugioh).toHaveLength(3);
    });

    it("has multiple magic references", () => {
        render(<MemoryRouter><App /></MemoryRouter>);
        const magic = screen.getAllByText("Magic");
        expect(magic).toHaveLength(3);
    });

    it("has a login button", () => {
        render(<MemoryRouter><App /></MemoryRouter>);
        const login = screen.getByText("Login");
        expect(login).toBeInTheDocument();
    });

    it("has a register button", () => {
        render(<MemoryRouter><App /></MemoryRouter>);
        const register = screen.getByText("Register");
        expect(register).toBeInTheDocument();
    });

});

describe("Test navigation links", () => {
    it("navigates to login page", () => {
        render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);
        const login = screen.getByText("Login");
        fireEvent.click(login);
        const loginPage = screen.getAllByText("Login");
        expect(loginPage).toHaveLength(3);
    });

    it("navigates to register page", () => {
        render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);
        const register = screen.getByText("Register");
        fireEvent.click(register);
        const registerPage = screen.getAllByText("Register");
        expect(registerPage).toHaveLength(3);
    });

    // it("navigates to cart page", () => {
    //     render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);
    //     const cart = screen.getByText("CartFill");
    //     fireEvent.click(cart);
    //     const cartPage = screen.getAllByText("Confirm Purchase");
    //     expect(cartPage).toBeInTheDocument();
    // });

    it("navigates to pokemon cards page", () => {
        render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);
        const pokemon = screen.getAllByText("Pokemon");
        fireEvent.click(pokemon[0]);
        const pokemonPage = screen.getAllByText("Pokemon");
        expect(pokemonPage).toHaveLength(2);
    });

    it("navigates to yugioh cards page", () => {
        render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);
        const yugioh = screen.getAllByText("Yu-Gi-Oh");
        fireEvent.click(yugioh[0]);
        const yugiohPage = screen.getAllByText("Yu-Gi-Oh");
        expect(yugiohPage).toHaveLength(2);
    });

    it("navigates to magic cards page", () => {
        render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);
        const magic = screen.getAllByText("Magic");
        fireEvent.click(magic[0]);
        const magicPage = screen.getAllByText("Magic");
        expect(magicPage).toHaveLength(2);
    });

});

describe("Login component renders correctly", () => {
    it("renders login component without crashing", () => {
        render(<MemoryRouter><Login /></MemoryRouter>);
    });

    it("has a login title & button", () => {
        render(<MemoryRouter><Login /></MemoryRouter>);
        const login = screen.getAllByText("Login");
        expect(login).toHaveLength(2);
    });

    it("has a username field", () => {
        render(<MemoryRouter><Login /></MemoryRouter>);
        const username = screen.getByLabelText("Username");
        expect(username).toBeInTheDocument();
    });

    it("has a password field", () => {
        render(<MemoryRouter><Login /></MemoryRouter>);
        const password = screen.getByLabelText("Password");
        expect(password).toBeInTheDocument();
    });
});

describe("Register component renders correctly", () => {
    it("renders register component without crashing", () => {
        render(<MemoryRouter><Register /></MemoryRouter>);
    });

    it("has a register title & button", () => {
        render(<MemoryRouter><Register /></MemoryRouter>);
        const register = screen.getAllByText("Register");
        expect(register).toHaveLength(2);
    });

    it("has a username field", () => {
        render(<MemoryRouter><Register /></MemoryRouter>);
        const username = screen.getByLabelText("Username");
        expect(username).toBeInTheDocument();
    });

    it("has a password field", () => {
        render(<MemoryRouter><Register /></MemoryRouter>);
        const password = screen.getByLabelText("Password");
        expect(password).toBeInTheDocument();
    });

    it("has a email field", () => {
        render(<MemoryRouter><Register /></MemoryRouter>);
        const email = screen.getByLabelText("Email");
        expect(email).toBeInTheDocument();
    });
});

describe("Cart component renders correctly", () => {
    it("renders cart component without crashing", () => {
        render(<MemoryRouter><Cart /></MemoryRouter>);
    });

    it("has a confirm purchase button", () => {
        render(<MemoryRouter><Cart /></MemoryRouter>);
        const register = screen.getByText("Confirm Purchase");
        expect(register).toBeInTheDocument();
    });

    it("has a first name field", () => {
        render(<MemoryRouter><Cart /></MemoryRouter>);
        const username = screen.getByLabelText("First Name");
        expect(username).toBeInTheDocument();
    });

    it("has a last name field", () => {
        render(<MemoryRouter><Cart /></MemoryRouter>);
        const password = screen.getByLabelText("Last Name");
        expect(password).toBeInTheDocument();
    });

    it("has a email field", () => {
        render(<MemoryRouter><Cart /></MemoryRouter>);
        const email = screen.getByText("Email");
        expect(email).toBeInTheDocument();
    });
});

describe("Profile component renders correctly", () => {
    it("renders profile component without crashing", () => {
        render(<MemoryRouter><Profile /></MemoryRouter>);
    });
});