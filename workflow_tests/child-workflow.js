export const meta = {
  name: 'child-workflow',
  description: 'Child workflow that enhances parent data with code examples',
  phases: [{ title: 'Enhance', detail: 'Add code examples' }],
}

phase('Enhance')
const result = await agent(
  `Given these best practices:\n${JSON.stringify(args?.items || ['no input'])}\n\nFor each one, write a short TypeScript code example. Return structured data.`,
  { label: 'child-enhancer' }
)
return { enhanced: result }
