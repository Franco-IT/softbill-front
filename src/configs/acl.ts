import { AbilityBuilder, AbilityClass, MongoAbility, MongoQuery, createMongoAbility } from '@casl/ability'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = MongoAbility<[Actions, Subjects], MongoQuery>
export const AppAbility = createMongoAbility as unknown as AbilityClass<AppAbility>

export type ACLObj = {
  action: Actions | Actions[]
  subject: string
}

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: string, subject: string | string[]) => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  const currentSubject = subject.includes(role) ? role : subject

  const permission = (role: string): Actions[] => {
    switch (role) {
      case 'ADMIN':
        return ['manage']
      case 'ACCOUNTING':
        return ['read', 'create', 'update', 'delete']
      case 'COUNTER':
        return ['read', 'create', 'update']
      case 'CLIENT':
        return ['read', 'update']
      default:
        return []
    }
  }

  can(permission(role), currentSubject)

  return rules
}

export const buildAbilityFor = (role: string, subject: string | string[]): AppAbility => {
  return new AppAbility(defineRulesFor(role, subject), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object!.type
  })
}

export const canAny = (ability: AppAbility, actions: Actions[], subject: Subjects) => {
  return actions.some(action => ability.can(action, subject))
}

export const defaultACLObj: ACLObj = {
  action: 'read',
  subject: 'all'
}

export default defineRulesFor
