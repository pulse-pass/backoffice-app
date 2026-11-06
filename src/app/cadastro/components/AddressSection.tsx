import { Field } from '@/components/Field'
import type { AddressFormData } from '@/services/legal-person/forms/create-legal-person.form.types'

import type { SectionProps } from '../page.types'

export function AddressSection({
  values,
  errors,
  onChange,
  onBlur,
  registerField,
}: SectionProps<AddressFormData>) {
  return (
    <section
      aria-labelledby="address-title"
      className="flex flex-col gap-lg rounded-sm border border-border-subtle bg-bg-surface p-md md:p-xl"
    >
      <h2 id="address-title" className="title-m flex items-baseline gap-sm text-text-primary">
        <span className="mono-m text-text-secondary">02</span>
        Endereço
      </h2>
      <Field
        ref={registerField('address.postal_code')}
        id="address-postal-code"
        name="address_postal_code"
        label="CEP"
        required
        numeric
        inputMode="numeric"
        autoComplete="postal-code"
        placeholder="00000-000"
        value={values.postal_code}
        error={errors['address.postal_code']}
        onChange={(event) => onChange('address.postal_code', event.target.value)}
        onBlur={() => onBlur('address.postal_code')}
      />
      <Field
        ref={registerField('address.street')}
        id="address-street"
        name="address_street"
        label="Logradouro"
        required
        autoComplete="address-line1"
        value={values.street}
        error={errors['address.street']}
        onChange={(event) => onChange('address.street', event.target.value)}
        onBlur={() => onBlur('address.street')}
      />
      <div className="grid gap-lg md:grid-cols-2">
        <Field
          ref={registerField('address.number')}
          id="address-number"
          name="address_number"
          label="Número"
          required
          autoComplete="off"
          value={values.number}
          error={errors['address.number']}
          onChange={(event) => onChange('address.number', event.target.value)}
          onBlur={() => onBlur('address.number')}
        />
        <Field
          ref={registerField('address.complement')}
          id="address-complement"
          name="address_complement"
          label="Complemento (opcional)"
          autoComplete="address-line2"
          value={values.complement}
          error={errors['address.complement']}
          onChange={(event) => onChange('address.complement', event.target.value)}
          onBlur={() => onBlur('address.complement')}
        />
      </div>
      <Field
        ref={registerField('address.neighborhood')}
        id="address-neighborhood"
        name="address_neighborhood"
        label="Bairro"
        required
        autoComplete="address-level3"
        value={values.neighborhood}
        error={errors['address.neighborhood']}
        onChange={(event) => onChange('address.neighborhood', event.target.value)}
        onBlur={() => onBlur('address.neighborhood')}
      />
    </section>
  )
}
