import { Request } from 'express'
import Joi from 'joi'
import { ErrorCode } from '../../errors/enums'
import { UserFacingError } from '../../errors/error'

type ValidatorParams<P, B, Q> = Partial<{
  params: Joi.ObjectSchema<P>
  body: Joi.ObjectSchema<B>
  query: Joi.ObjectSchema<Q>
}>

export const validateRequest = <P, B, Q>(
  req: Request,
  { params, body, query }: ValidatorParams<P, B, Q>
) => {
  let paramsValue
  if (params) {
    const { error, value } = params.validate(req.params)
    if (error) throw new UserFacingError(ErrorCode.validationFail, 400)
    paramsValue = value
  }
  let bodyValue
  if (body) {
    const { error, value } = body.validate(req.body)
    if (error) throw new UserFacingError(ErrorCode.validationFail, 400)
    bodyValue = value
  }
  let queryValue
  if (query) {
    const { error, value } = query.validate(req.body)
    if (error) throw new UserFacingError(ErrorCode.validationFail, 400)
    queryValue = value
  }
  return { ...paramsValue, ...bodyValue, ...queryValue } as P & B & Q
}
