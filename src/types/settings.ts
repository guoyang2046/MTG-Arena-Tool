export interface OverlaySettingsData {
  alpha: number;
  alpha_back: number;
  bounds: { width: number; height: number; x: number; y: number };
  cards_overlay: boolean;
  clock: boolean;
  draw_odds: boolean;
  deck: boolean;
  lands: boolean;
  keyboard_shortcut: boolean;
  mana_curve: boolean;
  mode: number;
  ontop: boolean;
  show: boolean;
  show_always: boolean;
  sideboard: boolean;
  title: boolean;
  top: boolean;
  type_counts: boolean;
}

export interface SettingsData {
  sound_priority: boolean;
  sound_priority_volume: number;
  cards_quality: string;
  cards_size: number;
  cards_size_hover_card: number;
  overlay_back_color: string;
  back_color: string;
  back_url: string;
  card_tile_style: number | string;
  overlay_scale: number;
  overlays: OverlaySettingsData[];
  overlayHover: { x: number; y: number };
  shortcut_editmode: string;
}
