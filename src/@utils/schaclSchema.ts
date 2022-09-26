import { retrieveShaclSchema } from '@utils/aquarius'
import { ShaclSchemaField } from '@context/MarketMetadata/_shaclType'

import { capitalizeFirstLetter } from '@utils/textTransform'

function getMinMax(valueField: string, field: ShaclSchemaField) {
  let min = field.minLength
  const max = field.maxLength

  // TODO: remove once all fields in schema has minLength property
  if (!min) {
    switch (valueField) {
      case 'name':
        min = 4
        break
      case 'description':
        min = 10
        break
      case 'author':
        min = 1
        break
      case 'tags':
        min = 1
        break
    }
  }

  return {
    minLength: min,
    maxLength: max
  }
}

export async function validateFieldSchaclSchema(
  keyField: string,
  valueField: string,
  value: any,
  createError: any
): Promise<any> {
  const schemaField: any = await retrieveShaclSchema()
  const fieldSchema: ShaclSchemaField = schemaField[keyField][valueField]
  const { minLength, maxLength } = getMinMax(valueField, fieldSchema)

  // TODO: add minLength when integrated in endpoint
  if (value.length < minLength) {
    return createError({
      message: `${capitalizeFirstLetter(
        valueField
      )} must be at least ${minLength} characters`
    })
  } else if (value.length > maxLength) {
    return createError({
      message: `${capitalizeFirstLetter(
        valueField
      )} must have maximum ${maxLength} characters`
    })
  } else {
    return value
  }
}