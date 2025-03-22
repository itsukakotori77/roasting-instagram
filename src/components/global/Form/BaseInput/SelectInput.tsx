import { joinClass } from "@/utils/common";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { forwardRef, PropsWithRef } from 'react'
import ReactSelect, { Props as ReactSelectProps, components } from 'react-select'

export interface SelectProps extends ReactSelectProps, PropsWithRef<any> {
   isValid?: boolean
   isInvalid?: boolean
   propsExtra?: any
   isMultiple?: boolean
}

const SelectInput = forwardRef<HTMLSelectElement, SelectProps>(
   (
      {
         className,
         isValid,
         isInvalid,
         isMultiple,
         propsExtra,
         name,
         isClearable = true,
         ...props
      },
      ref
   ) => {
      const DropdownIndicator = (props: any) => {
         return (
            <components.DropdownIndicator {...props}>
               {props?.selectProps?.menuIsOpen ? (
                  <FontAwesomeIcon
                     icon={faChevronDown}
                     className="rotate-180 transition-transform duration-500"
                  />
               ) : (
                  <FontAwesomeIcon
                     icon={faChevronDown}
                     className="rotate-0 transition-transform duration-500"
                  />
               )}
            </components.DropdownIndicator>
         )
      }
      return (
         <ReactSelect
            key={`${name}_${(props.value as any)?.value}`}
            menuShouldBlockScroll={false}
            instanceId={name}
            ref={ref}
            inputId={name}
            {...props}
            {...propsExtra}
            isClearable={isClearable}
            isSearchable
            isMulti={isMultiple}
            className={joinClass('w-full', className)}
            styles={{
               option: styles => ({ ...styles, fontSize: 14 }),
               singleValue: styles => ({ ...styles, fontSize: 14 }),
               placeholder: styles => ({
                  ...styles,
                  fontSize: 14,
                  whiteSpace: 'nowrap',
               }),
               indicatorSeparator: provided => ({
                  ...provided,
                  display: 'none',
               }),
               indicatorsContainer: styles => ({
                  ...styles,
                  padding: '0px 8px',
               }),
               dropdownIndicator: styles => ({
                  ...styles,
                  padding: 0,
               }),
               container: () => ({
                  position: 'relative',
                  boxSizing: 'border-box',
                  // zIndex: 3,
               }),
               menu: () => ({
                  position: 'absolute',
                  width: '100%',
                  background: 'white',
                  border: '1px solid #eee',
                  top: 'calc(100% + 5px)',
                  borderRadius: '8px',
                  zIndex: 1,
               }),
               control: provided => ({
                  ...provided,
                  // paddingTop: '0.125rem',
                  // paddingBottom: '0.125rem',
                  borderRadius: '0.5rem',
                  border: isInvalid
                     ? '1px solid #ee4620'
                     : isValid
                        ? '1px solid 	#49d475'
                        : '1px solid #d1d5db',
                  outline: 'none',
                  boxShadow: 'none',
               }),
               ...props.styles,
            }}
            menuPosition="absolute"
            menuShouldScrollIntoView={true}
            components={{ DropdownIndicator }}
         />
      )
   }
)

SelectInput.displayName = 'SelectInput'

export default SelectInput
