import './style.scss'

const Dropdown = ({
                      className,
                      value,
                      options,
                      onChange,
                  }) => {
    return (
        <div className={`dropdown ${className ? className : ''}`}>
            <select className='admin-page-select' value={value} onChange={onChange}>
                {options.map(option => {
                    console.log(option)
                    return <option key={option.value} value={option.value}>{option.label}</option>;
                })}
            </select>
        </div>
    );
};

export default Dropdown;