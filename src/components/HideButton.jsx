function HideButton({isOpen, setIsOpen}) {
    return <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
    >
        {isOpen ? "–" : "+"}
    </button>
}

export default HideButton