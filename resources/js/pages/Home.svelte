<script lang="ts">
    import StepDrawing from '@/components/StepDrawing.svelte';
    import { t } from '@coachboard/i18n/ui';
    import type { Board } from '@coachboard/lib/board/format';

    interface Props {
        title: string;
        board: Board;
    }

    let { title, board }: Props = $props();
</script>

<h1>{title}</h1>

<StepDrawing {board} step={0} label={t('nl', 'tactic.diagram', { n: '1' })} />
