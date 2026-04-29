
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Header()
{
	
	return	<nav className="navbar navbar-expand-lg navbar-light">
				<div className="container">
					<a className="navbar-brand fw-bold" href="/">mdimitrov.com</a>
					<button className="navbar-toggler" type="button" data-bs-target="#navbarNav">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav ms-auto">
							<li className="nav-item"><Link to="/" className="nav-link">Начало</Link></li>
							<li className="nav-item"><Link to="/book" className="nav-link">Книги</Link></li>
							<li className="nav-item"><Link to="/contacts" className="nav-link">Контакти</Link></li>
						</ul>
					</div>
				</div>
			</nav>
}