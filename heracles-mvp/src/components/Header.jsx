function Header({ title, action }) {
  return (
    <div className="header">
      <span className="header-title">{title}</span>
      {action && (
        <button className="header-action" onClick={action.onClick}>
          {action.icon}
        </button>
      )}
    </div>
  );
}

export default Header;