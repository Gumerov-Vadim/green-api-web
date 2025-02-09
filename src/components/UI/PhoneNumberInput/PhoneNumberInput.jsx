import { useState, useEffect, useCallback, memo } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { getExampleNumber } from 'libphonenumber-js';
import 'react-phone-number-input/style.css';
import './PhoneNumberInput.css';

const CustomInput = memo((props) => (
  <input {...props} type="tel" autoComplete="tel" />
));

const PhoneNumberInput = ({value, setValue, isCorrectPhoneNumber, setIsCorrectPhoneNumber, isWrongPhoneNumber}) => {
  const [country, setCountry] = useState('RU');
  const [maxLength, setMaxLength] = useState(11);

  useEffect(() => {
    try {
      const example = getExampleNumber(country);
      if (!example) return;
      
      const cleaned = example.number.replace(/\D/g, '');
      setMaxLength(cleaned.length);
    } catch {
      setMaxLength(11);
    }
  }, [country]);

  const handleChange = useCallback(
    (phoneValue) => {
      if (!phoneValue) {
        setValue('');
        return;
      }
      

      const rawValue = phoneValue.replace(/\D/g, '');
      if (rawValue.length > maxLength) return;
      
      if (!isValidPhoneNumber(phoneValue)) {
        setIsCorrectPhoneNumber(false);
      } else {
        setIsCorrectPhoneNumber(true);
      }
     
      setValue(phoneValue);
    },
    [maxLength, setValue]
  );

  const renderInputComponent = useCallback(
    (props) => (
      <CustomInput
        {...props}
        maxLength={maxLength + 5}
      />
    ),
    [maxLength]
  );

  return (
    <div className="phone-input">
      <PhoneInput
        international
        defaultCountry="RU"
        value={value}
        onChange={handleChange}
        onCountryChange={setCountry}
        limitMaxLength
        inputComponent={renderInputComponent}
      />
      {isWrongPhoneNumber && <span className="error-message">Некорректный номер</span>}
    </div>
  );
};


export default PhoneNumberInput;