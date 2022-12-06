import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://utsmcawlhowegczgnvnd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0c21jYXdsaG93ZWdjemdudm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAyNjkyNjcsImV4cCI6MTk4NTg0NTI2N30.0T7JcUXPKvXVeKpv8sBdmMLEBl0di4LZgUR_KEOGrQI')

export {
  supabase
}