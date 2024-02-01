import React from 'react';

function Input({ name, text, type, isRequired, value, onChange, maxLength }) {
    if (isRequired) {
        return (
            <div>
                
            </div>
        );
    } else {
        return (
            <div>
                <input
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={text}
                    className="m-1 w-full rounded border border-slate bg-secondary p-3 font-sans text-[12px] placeholder:text-stone-800 placeholder:text-[11px] placeholder:text-primary placeholder:opacity-60 placeholder:font-medium outline-0 focus:bg-tertiary transition-all duration-75"
                />
            </div>
        );
    }
}

export default Input;
