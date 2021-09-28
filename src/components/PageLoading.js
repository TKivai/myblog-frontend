import styles from '../css/components/PageLoading.module.css'

function PageLoadingComponent () {
    return (
        <div className={styles.page_loading_backdrop}>
            <div className="spinner-grow" id={styles.spinner_grow} role="status">
            </div>
            <span className="sr-only" id={styles.span_text}>Loading...</span>
        </div>
        
    );
}

export default PageLoadingComponent;
