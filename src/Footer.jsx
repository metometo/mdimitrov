

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Footer()
{	
	return	<footer id="contact">
				<div className="container text-center">
					<p className="mb-1">📧 <a href="mailto:stories.by.metodi.dimitrov@gmail.com" className="text-decoration-none text-muted">stories.by.metodi.dimitrov@gmail.com</a></p>
					<p className="mb-1">📧 <a href="mailto:stories.by.metodi.dimitrov@gmail.com" className="text-decoration-none text-muted">contact@mdimitrov.com</a></p>
					<p className="text-muted mt-4"><small>&copy; 2026 Методи Димитров. Всички права запазени.</small></p>
				</div>
			</footer>
}