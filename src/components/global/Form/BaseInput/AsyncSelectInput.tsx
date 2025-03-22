import { LabelValueProps } from '@/app/interface/select'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { forwardRef, PropsWithRef } from 'react'
import { components } from 'react-select'
import Async, { AsyncProps } from 'react-select/async'

export interface AsyncSelectInputProps extends AsyncProps<LabelValueProps, false, any>, PropsWithRef<any> {
   isValid?: boolean
   isInvalid?: boolean
   hideLoading?: boolean
   noOptionsText?: string
}

const AsyncSelectInput = forwardRef<HTMLSelectElement, AsyncSelectInputProps>(
   (
      {
         isInvalid,
         isValid,
         hideLoading,
         noOptionsText,
         ...props
      },
      ref
   ) => {
      const DropdownIndicator = (e: any) => {
         return (
            <components.DropdownIndicator {...e}>
               {e?.selectProps?.menuIsOpen ? (
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
         <Async
            ref={ref as any}
            {...props}
            isClearable
            isSearchable
            styles={{
               option: styles => ({ ...styles, fontSize: 14 }),
               singleValue: styles => ({ ...styles, fontSize: 14 }),
               placeholder: styles => ({
                  ...styles,
                  fontSize: 14,
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
                  position: 'static',
                  boxSizing: 'border-box',
                  zIndex: 3,
               }),
               menu: () => ({
                  position: 'absolute',
                  width: '100%',
                  background: 'white',
                  border: '1px solid #eee',
                  top: '5px',
                  borderRadius: '8px',
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
               // loadingIndicator: provided => {
               //   const display = hideLoading ? 'none' : 'block'
               //   return {
               //     ...provided,
               //     display,
               //   }
               // },
               ...props.styles,
            }}
            menuPosition="fixed"
            menuShouldBlockScroll={true}
            menuShouldScrollIntoView={true}
            components={{ DropdownIndicator }}
            noOptionsMessage={({ inputValue }) =>
               !inputValue ? noOptionsText : 'No Options'
            }
         />
      )
   }
)

AsyncSelectInput.displayName = 'AsyncSelectInput'

export default AsyncSelectInput
