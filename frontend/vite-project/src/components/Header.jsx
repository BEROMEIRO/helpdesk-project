import { Link } from 'react-router-dom';
import { useState } from 'react';

function Header() {  // Alterado de Navbar para Header
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="logo">HelpDesk</Link>
                <div className="nav-links">
                    <Link to="/" className="link">Home</Link>

                    <div className="dropdown-container">
                        <span className="link" onClick={toggleDropdown}>
                            Chamados ▾
                        </span>
                        {isDropdownOpen && (
                            <div className="dropdown">
                                <Link to="/create" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                                    ➕ Criar Chamado
                                </Link>
                                <Link to="/delete" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                                    🗑️ Deletar Chamado
                                </Link>
                                {/* <Link to="/edit" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                                    ✏️ Editar Chamado
                                </Link> */}
                                <Link to="/tickets" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                                    📋 Acompanhar Chamado
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link to="/about" className="link">Sobre</Link>
                </div>
            </div>
        </nav>
    );
}

export default Header;  // Exportando como Header agora
