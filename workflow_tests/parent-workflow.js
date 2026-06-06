export const meta = {
  name: 'test-5-nested-v2',
  description: 'Test nested workflow with saved child script file',
  phases: [
    { title: 'Prep', detail: 'Prepare data in parent' },
    { title: 'Child', detail: 'Run child workflow' },
    { title: 'Merge', detail: 'Combine results' },
  ],
}

const LIST_SCHEMA = {
  type: 'object',
  properties: {
    items: { type: 'array', items: { type: 'string' } },
  },
  required: ['items'],
}

phase('Prep')
const parentData = await agent(
  'List 5 programming best practices about error handling. Return them as an array of strings.',
  { label: 'parent-prep', schema: LIST_SCHEMA }
)
log(`Parent prepared ${(parentData?.items || []).length} items`)

phase('Child')
const childScriptPath = 'C:\\Users\\admin\\.claude\\telegram-workplace\\workflow_tests\\child-workflow.js'
const childResult = await workflow({ scriptPath: childScriptPath }, { items: parentData?.items || [] })
log('Child workflow completed')

phase('Merge')
const merged = await agent(
  `Merge into a formatted report:\n\nBest practices: ${JSON.stringify(parentData?.items || [])}\n\nChild result: ${JSON.stringify(childResult)}\n\nCreate a clean summary.`,
  { label: 'merge' }
)

log('Nested workflow test complete')
return { parentItems: parentData?.items?.length || 0, childResult, merged }
