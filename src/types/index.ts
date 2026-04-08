export type ProjectCategory = 'cbse' | 'intermediate' | 'advanced';
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type BoardType = 'arduino_uno' | 'esp32' | 'arduino_nano';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  difficulty: DifficultyLevel;
  board: BoardType;
  components: string[];
  samplePrompt: string;
  learningGoals: string[];
  cbseTags: string[];
  wokwiId: string;
  estimatedBudget: string;
  classroomRelevance: string;
}

export interface PinConnection {
  from_pin: string;
  to_node: string;
  notes: string;
}

export interface PinDevice {
  device: string;
  details: string;
  connections: PinConnection[];
}

export interface SafetyCheck {
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
}

export interface BomItem {
  component: string;
  quantity: string;
  notes: string;
}

export interface BuilderResponse {
  pin_map: PinDevice[];
  circuit_flow: string[];
  safety_checks: SafetyCheck[];
  bom: BomItem[];
  code: string;
  follow_up_questions?: string[];
  concepts_learned?: string[];
  estimated_budget?: string;
}

export interface AgentStep {
  t: number;
  agent: 'Builder' | 'Circuit' | 'Mentor' | 'Simulator' | 'All';
  msg: string;
}
